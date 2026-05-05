import { Entity51628Repository as EntityDao } from "../../test/gen/test/data/Entities/Entity51628Repository";

import { Controller, Get } from "@aerokit/sdk/http";
import { Operator } from "@aerokit/sdk/db";

@Controller
class TestService {

    private readonly entityDao;

    constructor() {
        this.entityDao = new EntityDao();
    }

    @Get("/test")
    public testData() {

        const currentDate = new Date();

        const testDue = this.entityDao.findAll({
            conditions: [
                {
                    propertyName: "Due",
                    operator: Operator.GE,
                    value: currentDate
                }
            ]
        });

        console.log(JSON.stringify(testDue[0]));

    }
}