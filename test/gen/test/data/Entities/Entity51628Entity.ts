import { Entity, Table, Id, Generated, Column, Documentation, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy} from '@aerokit/sdk/db'

@Entity('Entity51628Entity')
@Table('CODBEX_ENTITY51628')
@Documentation('Entity51628 entity mapping')
export class Entity51628Entity {

    @Id()
    @Generated('sequence')
    @Documentation('Id')
    @Column({
        name: 'ENTITY51628_ID',
        type: 'integer',
    })
    public Id?: number;

    @Documentation('Due')
    @Column({
        name: 'ENTITY51628_DUE',
        type: 'date',
        nullable: true,
    })
    public Due?: Date;

    @Documentation('Property3')
    @Column({
        name: 'ENTITY51628_PROPERTY3',
        type: 'string',
        length: 20,
        nullable: true,
    })
    public Property3?: string;

    @Documentation('Property4')
    @Column({
        name: 'ENTITY51628_PROPERTY4',
        type: 'string',
        length: 20,
        nullable: true,
    })
    public Property4?: string;

}

(new Entity51628Entity());
