export interface Cancellation {
	_id: string;
	entityId: string;
	isCancelled: boolean;
	reason: string;
	date: Date;
	by: User;
}
