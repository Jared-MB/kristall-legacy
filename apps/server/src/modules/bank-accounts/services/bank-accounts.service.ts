import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Shop } from '@kristall/server/src/entities';
import { BankAccount } from '@kristall/server/src/entities/bank-account';
import { Utils } from '@kristall/server/src/utilities';
import { Crypto } from '@kristall/server/src/utilities/Crypto';
import { ServerError } from '@kristall/server/src/utilities/Errors';
import { Repository } from 'typeorm';

@Injectable()
export class BankAccountsService {
    constructor(
        private readonly crypto: Crypto,
        @InjectRepository(BankAccount)
        private readonly bankAccountRepository: Repository<BankAccount>,
        private readonly utils: Utils,
    ) { }

    async deleteBankAccount(id: string) {
        const bankAccount = await this.getBankAccount(id);
        if (!bankAccount) {
            throw new ServerError('No route found', 404);
        }
        await this.bankAccountRepository.delete(bankAccount);
        return true;
    }

    async removeBankAccounts(shopId: string) {
        const bankAccounts = await this.bankAccountRepository.find({
            where: {
                shop: {
                    _id: shopId,
                },
            },
        });
        await this.bankAccountRepository.remove(bankAccounts);
        return true;
    }

    async createBankAccount(
        bank: string,
        clabe: number,
        owner: string,
        shop: Shop,
        accountNumber?: number,
        password?: string,
    ) {
        const _id = randomUUID();
        let encryptedAccountNumber = undefined
        if (accountNumber) {
            encryptedAccountNumber = await this.crypto.encryptData(
                accountNumber,
                password,
            );
        }
        const encryptedBank = await this.crypto.encryptData(bank, password);
        const encryptedClabe = await this.crypto.encryptData(clabe, password);
        const encryptedOwner = await this.crypto.encryptData(owner, password);
        let version = 'v1.0.0';
        if (password) {
            version = 'v2.0.0';
        }
        const bankAccount = this.bankAccountRepository.create({
            _id,
            accountNumber: encryptedAccountNumber,
            bank: encryptedBank,
            lastFourDigits: Number(clabe.toString().slice(-4)),
            clabe: encryptedClabe,
            owner: encryptedOwner,
            shop,
            _v: version,
        });
        await this.bankAccountRepository.save(bankAccount);
        return await this.getSafeBankAccount(bankAccount._id);
    }

    async getBankAccounts(shopID: string, password?: string) {
        const bankAccounts = await this.bankAccountRepository.find({
            where: {
                shop: {
                    _id: shopID,
                },
            },
        });

        const versionOneBankAccounts = bankAccounts.filter((bankAccount) => {
            return bankAccount._v === 'v1.0.0';
        });
        const decryptedBankAccountsVersionOne = this.decryptBankAccounts(
            versionOneBankAccounts,
        );
        if (password) {
            const versionTwoBankAccounts = bankAccounts.filter((bankAccount) => {
                return bankAccount._v === 'v2.0.0';
            });
            const decryptedBankAccountsVersionTwo = this.decryptBankAccounts(
                versionTwoBankAccounts,
                password,
            );
            return Promise.all([
                ...decryptedBankAccountsVersionOne,
                ...decryptedBankAccountsVersionTwo,
            ]);
        }
        return Promise.all(decryptedBankAccountsVersionOne);
    }

    async getSafeBankAccounts(shopID: string) {
        const bankAccounts = await this.bankAccountRepository.find({
            where: {
                shop: {
                    _id: shopID,
                },
            },
        });
        const decryptBankAccounts = bankAccounts.map(async (bankAccount) => {
            const bank = await this.crypto.decryptData(bankAccount.bank);
            return {
                _id: bankAccount._id,
                bank,
                //accountNumber: '**** **** **** ' + bankAccount.lastFourDigits,
                accountNumber: '**** **** *** *** ' + bankAccount.lastFourDigits
            };
        });
        return Promise.all(decryptBankAccounts);
    }

    public async getSafeBankAccount(_id: string) {
        const bankAccount = await this.bankAccountRepository.findOne({
            where: {
                _id,
            },
        });

        if (!bankAccount) {
            return null
        }

        const bank = await this.crypto.decryptData(bankAccount.bank);
        const decryptClabe = await this.crypto.decryptData(bankAccount.clabe);
        const clabe = this.utils.divideAccountNumber(decryptClabe);
        return {
            _id: bankAccount._id,
            bank,
            accountNumber: clabe
        };
    }

    public getBankAccount(id: string) {
        return this.bankAccountRepository.findOne({
            where: {
                _id: id,
            },
            relations: {
                shop: true,
            },
        });
    }

    private decryptBankAccounts(bankAccounts: BankAccount[], password?: string) {
        return bankAccounts.map(async (bankAccount) => {
            const decryptedBank = await this.crypto.decryptData(
                bankAccount.bank,
                password,
            );
            let decryptedAccountNumber = null
            if (bankAccount.accountNumber) {
                decryptedAccountNumber = await this.crypto.decryptData(
                    bankAccount.accountNumber,
                    password,
                );
            }
            const decryptedClabe = await this.crypto.decryptData(
                bankAccount.clabe,
                password,
            );
            const decryptedOwner = await this.crypto.decryptData(
                bankAccount.owner,
                password,
            );
            return {
                ...bankAccount,
                bank: decryptedBank,
                accountNumber: decryptedAccountNumber,
                clabe: decryptedClabe,
                owner: decryptedOwner,
            };
        });
    }
}
