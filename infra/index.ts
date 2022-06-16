import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// https://us-west-2.console.aws.amazon.com/apprunner/home.
const connection = new aws.apprunner.Connection("connection", {
    connectionName: "my-connection",
    providerType: "GITHUB",
});

const service = new aws.apprunner.Service("service", {
    serviceName: "my-blog",
    sourceConfiguration: {
        authenticationConfiguration: {
            connectionArn: connection.arn,
        },
        codeRepository: {
            codeConfiguration: {
                codeConfigurationValues: {
                    buildCommand: "cd app && npm run build",
                    port: "3000",
                    runtime: "NODEJS_14",
                    startCommand: "cd app && npm start",
                },
                configurationSource: "API",
            },
            repositoryUrl: "https://github.com/cnunciato/pulumi-nextjs-on-aws",
            sourceCodeVersion: {
                type: "BRANCH",
                value: "master",
            },
        },
    },
});
