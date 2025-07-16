import { HttpException } from "@nestjs/common";

export class SubscriptionFeatureLimitException extends HttpException {
    constructor({
        entity,
        maxAllowed
    }: {
        entity: string;
        maxAllowed: number;
    }) {
        const message = `You have reached the limit of ${maxAllowed} ${entity}.`;

        super({
            message,
            error: 'Subscription feature limit reached'
        }, 403);
    }
}