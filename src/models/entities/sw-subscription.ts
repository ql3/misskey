import { PrimaryGeneratedColumn, Entity, Index, JoinColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class SwSubscription {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column('date')
	public createdAt: Date;

	@Index()
	@Column('integer')
	public userId: User['id'];

	@ManyToOne(type => User, {
		onDelete: 'CASCADE'
	})
	@JoinColumn()
	public user: User | null;

	@Column('varchar', {
		length: 256,
	})
	public endpoint: string;

	@Column('varchar', {
		length: 256,
	})
	public auth: string;

	@Column('varchar', {
		length: 128,
	})
	public publickey: string;
}