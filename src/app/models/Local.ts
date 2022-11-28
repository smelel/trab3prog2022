import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
@Entity('tb_local')
class Local {
    @PrimaryGeneratedColumn()//geracao automatica de chave primaria
    id: number;

    @Column("varchar", { length: 20 })
    nome: string;

    @Column("varchar", { length: 8 })
    latitude: string;

    @Column("varchar", { length: 8 })
    longitude: string;
}
export default Local;