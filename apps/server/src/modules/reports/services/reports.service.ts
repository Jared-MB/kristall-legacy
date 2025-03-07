import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorLog } from '../models/report.model';

interface Context {
  shopId?: string,
  userId?: string,
  operation?: string,
}

@Injectable()
export class ReportsService  {
    constructor(
      @InjectRepository(ErrorLog)
      private errorLogRepository: Repository<ErrorLog>
    ) {}
  
    async logError(error: Error, severity: ErrorLog['severity'] = 'LOW', context: Context = {} as Context) {
      try {
        const stackLines = error.stack?.split('\n');
        const errorLocation = this.parseStackTrace(stackLines?.[1] || '');
  
        const errorLog = this.errorLogRepository.create({
          errorMessage: error.message,
          errorCode: error.name,
          severity,
          functionName: errorLocation.function,
          fileName: errorLocation.file,
          lineNumber: errorLocation.line,
          context: {
            ...context,
            timestamp: new Date().toISOString(),
          },
          userId: context?.userId,
        });
  
        await this.errorLogRepository.save(errorLog);
  
        // Si el error es crítico, podríamos querer notificar inmediatamente
        if (errorLog.severity === 'CRITICAL') {
          await this.notifyCriticalError(errorLog);
        }
  
        return errorLog;
      } catch (loggingError) {
        // En caso de que falle el logging, al menos dejamos constancia en console
        console.error('Error logging failed:', loggingError);
        console.error('Original error:', error);
      }
    }
  
    private parseStackTrace(stackLine: string) {
      const parsed = {
        module: 'unknown',
        function: 'unknown',
        file: 'unknown',
        line: 0,
      };
  
      try {
        // Ejemplo de línea de stack: "at UserService.createUser (/src/services/user.service.ts:24:5)"
        const match = stackLine.match(/at (.+?) \((.+?):(\d+):(\d+)\)/);
        if (match) {
          parsed.function = match[1];
          parsed.file = match[2];
          parsed.line = parseInt(match[3], 10);
          parsed.module = match[2].split('/').slice(-2)[0].replace('.ts', '');
        }
      } catch (e) {
        console.error('Error parsing stack trace:', e);
      }
  
      return parsed;
    }
  
    private async notifyCriticalError(errorLog: ErrorLog) {
      // Implementa tu lógica de notificación (email, Slack, etc.)
      // Ejemplo: await this.notificationService.notify(errorLog);
    }
  
    async getRecentErrors(limit = 10) {
      return this.errorLogRepository.find({
        order: { createdAt: 'DESC' },
        take: limit,
      });
    }
  
    async markAsResolved(errorId: string, resolution: string) {
      await this.errorLogRepository.update(errorId, {
        isResolved: true,
        resolvedAt: new Date(),
        resolution,
      });
    }
  }