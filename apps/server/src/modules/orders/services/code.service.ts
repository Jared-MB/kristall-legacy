import { Injectable } from '@nestjs/common';
import { Crypto } from '@kristall/server/src/utilities/Crypto';

@Injectable()
export class CodeService {

    constructor(
        private readonly crypto: Crypto,
    ) { }

    private removeBlankSpaces(string: string): string {
        return string.replace(/\s/g, '');
    }

    private fillWithZeros(number: number): string {
        const length = 6;
        const numberString = number.toString();
        const zeros = length - numberString.length;
        let result = '';
        for (let i = 0; i < zeros; i++) {
            result += '0';
        }
        return result + numberString;
    };

    private createShopNameCode(shop: string): string {
        const words = shop.split(' ');
        if (words.length === 1) {
            return (
                shop.slice(0, 1).toUpperCase() +
                shop.slice(shop.length / 2, shop.length / 2 + 1).toUpperCase() +
                shop.slice(-1).toUpperCase()
            );
        }
        if (words.length === 2) {
            return (
                words[0].slice(0, 1).toUpperCase() +
                words[1].slice(0, 1).toUpperCase() +
                words[1].slice(-1).toUpperCase()
            );
        }
        return (
            words[0].slice(0, 1).toUpperCase() +
            words[1].slice(0, 1).toUpperCase() +
            words[2].slice(0, 1).toUpperCase()
        );
    };

    /**
     * Generate a code for an order
     * @param name The name of the customer
     * @param shop The name of the shop
     * @param totalOrders The total number of orders
     */
    public generate(
        name: string,
        shop: string,
        totalOrders: number,
    ) {
        const shopNameCode = this.createShopNameCode(shop);
        const firstInitials = name.slice(0, 3).toUpperCase().trim();
        const lastInitials = name.slice(-3).toUpperCase().trim();
        const trimmedName = this.removeBlankSpaces(firstInitials + lastInitials);
        const orderNumber = totalOrders + 1;
        return (
            shopNameCode +
            '-' +
            trimmedName +
            '-' +
            this.fillWithZeros(orderNumber)
        );
    };

    public generateNoNameCode(shop: string, totalOrders: number): string {
        const shopNameCode = this.createShopNameCode(shop);
        const orderNumber = totalOrders + 1;
        return shopNameCode + '-' + this.fillWithZeros(orderNumber);
    };

    public generateSecurityCode = async () => {
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        return await this.crypto.encryptData(code);
    }

    public verifySecurityCode = async (code: string, hash: string) => {
        if (code.length === 4) {
            return code === hash
        }
        const orderCode = await this.crypto.decryptData(hash);
        return orderCode === code
    }

    public decryptSecurityCode = async (code: string) => {
        if (code.length === 4) {
            return code
        }
        const orderCode = await this.crypto.decryptData(code);
        return orderCode
    }
}
