import { Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { getSuffixFromStack } from '../Utils';


export class DataStack extends Stack {

    public readonly productsTable: ITable;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const suffix = getSuffixFromStack(this);

        this.productsTable = new Table(this, 'ProductsTable', {
            partitionKey : {
                name: 'id',
                type: AttributeType.STRING
            },
            tableName: `ProductsStack-${suffix}`
        })
    }

}