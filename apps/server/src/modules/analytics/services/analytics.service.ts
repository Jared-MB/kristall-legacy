import { Injectable } from "@nestjs/common";
import { Expense, Payment } from "@/server/entities";
import { DataSource } from "typeorm";

@Injectable()
export class AnalyticsService {

    constructor(
        private dataSource: DataSource
    ) {

    }

    async getAnalytics(shopId: any) {

        // CREATE AN OBJECT THAT CONTAINS THE EARNINGS BY DAY LIKE THIS:
        // [{
        //     date: '2021-03-01',
        //     earnings: 100,
        //     cost: 20
        // }, {
        //     date: '2021-03-02',
        //     earnings: 200,
        //     cost: 30
        // }]
        try {
            // Consulta para obtener los ingresos por día
            const earningsByDay = await this.dataSource.createQueryBuilder()
                .select('DATE(payment.date)', 'date')
                .addSelect('SUM(payment.total-payment."pendingPayment")', 'earnings')
                .from(Payment, 'payment')
                .where('payment.shop_id = :shopId', { shopId })
                .groupBy('DATE(payment.date)')
                .orderBy('DATE(payment.date)', 'ASC')
                .getRawMany();

            // Consulta para obtener los gastos por día
            const costByDay = await this.dataSource.createQueryBuilder()
                .select('DATE(expense.date)', 'date')
                .addSelect('SUM(expense.amount)', 'cost')
                .from(Expense, 'expense')
                .where('expense.shop_id = :shopId', { shopId })
                .groupBy('DATE(expense.date)')
                .orderBy('DATE(expense.date)', 'ASC')
                .getRawMany();

            // Combinar los resultados
            const combinedResults = {};

            // Procesar ingresos
            earningsByDay.forEach(entry => {
                const date = entry.date;
                if (!(combinedResults as any)[date]) {
                    (combinedResults as any)[date] = { date: date, earnings: 0, cost: 0 };
                }
                (combinedResults as any)[date].earnings = parseFloat(entry.earnings);
            });

            // Procesar gastos
            costByDay.forEach(entry => {
                const date = entry.date;
                if (!(combinedResults as any)[date]) {
                    (combinedResults as any)[date] = { date: date, earnings: 0, cost: 0 };
                }
                (combinedResults as any)[date].cost = parseFloat(entry.cost);
            });

            // Convertir a un array y ordenar por fecha
            const orderedEarningsByDay = Object.values(combinedResults).sort((a, b) => {
                return new Date((a as any).date).getTime() - new Date((b as any).date).getTime();
            });

            return { earningsByDay: orderedEarningsByDay };
        } catch (error) {
            console.log(error);
        }



    }
}
