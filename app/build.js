const slsLambdaEdge = require ("@sls-next/lambda-at-edge");

const builder = new slsLambdaEdge.Builder(".", "./build", {
    args: [
        "build",
    ],
});

builder
    .build()
    .then(() => {

    })
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });
