import { Repository, EntityEvent, EntityConstructor, Options } from '@aerokit/sdk/db'
import { Component } from '@aerokit/sdk/component'
import { Producer } from '@aerokit/sdk/messaging'
import { Extensions } from '@aerokit/sdk/extensions'
import { Entity51628Entity } from './Entity51628Entity'

@Component('Entity51628Repository')
export class Entity51628Repository extends Repository<Entity51628Entity> {

    constructor() {
        super((Entity51628Entity as EntityConstructor));
    }

    public override findById(id: string | number, options?: Options): Entity51628Entity | undefined {
        const entity = super.findById(id, options);
        if (entity) {
            entity.Due = entity.Due ? new Date(entity.Due) : undefined;
        }
        return entity;
    }

    public override findAll(options?: Options): Entity51628Entity[] {
        const entities = super.findAll(options);
        entities.forEach(entity => {
            entity.Due = entity.Due ? new Date(entity.Due) : undefined;
        });
        return entities;
    }

    protected override async triggerEvent(data: EntityEvent<Entity51628Entity>): Promise<void> {
        const triggerExtensions = await Extensions.loadExtensionModules('test-Entities-Entity51628', ['trigger']);
        triggerExtensions.forEach(triggerExtension => {
            try {
                triggerExtension.trigger(data);
            } catch (error) {
                console.error(error);
            }
        });
        Producer.topic('test-Entities-Entity51628').send(JSON.stringify(data));
    }
}
