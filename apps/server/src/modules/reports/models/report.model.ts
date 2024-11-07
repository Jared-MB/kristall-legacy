import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
  
  @Entity('error_logs')
  export class ErrorLog {
    @PrimaryGeneratedColumn('uuid')
    _id: string;
  
    @Column('varchar')
    errorMessage: string;
  
    @Column('varchar')
    errorCode: string;
  
    @Column('varchar')
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  
    @Column('varchar', { nullable: true })
    functionName: string;
  
    @Column('varchar', { nullable: true })
    fileName: string;
  
    @Column('int', { nullable: true })
    lineNumber: number;
  
    @Column('jsonb', { nullable: true })
    context: Record<string, any>;
  
    @Column('varchar', { nullable: true })
    userId: string;
  
    @CreateDateColumn()
    @Index()
    createdAt: Date;
  
    @Column('boolean', { default: false })
    isResolved: boolean;
  
    @Column('timestamp', { nullable: true })
    resolvedAt: Date;
  
    @Column('varchar', { nullable: true })
    resolution: string;
  }
  
  // Modelo opcional para agrupar errores similares
  @Entity('error_groups')
  export class ErrorGroup {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('varchar')
    groupHash: string;
  
    @Column('int')
    occurrences: number;
  
    @Column('timestamp')
    firstSeen: Date;
  
    @Column('timestamp')
    lastSeen: Date;
  
    @Column('boolean', { default: false })
    isResolved: boolean;
  }
  
  // Modelo opcional para acciones tomadas sobre los errores
  @Entity('error_actions')
  export class ErrorAction {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => ErrorLog)
    errorLog: ErrorLog;
  
    @Column('varchar')
    actionType: 'NOTIFICATION_SENT' | 'TICKET_CREATED' | 'MANUAL_REVIEW' | 'AUTOMATED_FIX';
  
    @Column('varchar')
    description: string;
  
    @Column('varchar')
    performedBy: string;
  
    @CreateDateColumn()
    performedAt: Date;
  }