const TYPES = [];

TYPES.push(
    {
        isSingleDoc: true, 
        type: 'module', 
        group: '@module',
        properties: {
            Name: {
                pattern: /@moduleName\s+(\w.*)/
            },
            Version: {
                pattern: /@moduleVersion\s+(\w.*)/
            },
            Group: {
                pattern: /@moduleGroup\s+(\w.*)/
            },
            Description: {
                pattern: /@moduleDescription\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/
            },
            Dependency: {
                pattern: /@moduleDependency\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/
            },
            Usage: {
                pattern: /@moduleUsage\s+((.|[\n\r])*?(?=\s\*\/))/,
                options: { isCode: true }
            },
        }
    }
);
TYPES.push(
    {
        isSingleDoc: true,
        type: 'mqtt', 
        group: '@mqtt',
        properties: {
            Name: {
                pattern: /@mqttName\s+(\w.*)/
            },
            Version: {
                pattern: /@mqttClientVersion\s+(\w.*)/
            },
            BrokerUrl: {
                pattern: /@mqttBrokerUrl\s+([\/\w].*)/
            },
            Description: {
                pattern: /@mqttDescription\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/
            },	
            Subscribe: {
                pattern: /@mqttSubscribe\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/
            },
            Publish: {
                pattern: /@mqttPublish\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/
            },
        }
    }
);
TYPES.push(
    {
        isSingleDoc: false, 
        type: 'api', 
        group: '@api',
        properties: {
            Name: {
                pattern: /@apiName\s+(\w.*)/
            },
            Method: {
                pattern: /@apiMethod\s+(\w.*)/
            },
            Url: {
                pattern: /@apiUrl\s+([\/\w].*)/
            },
            Version: {
                pattern: /@apiVersion\s+(\w.*)/
            },
            Group: {
                pattern: /@apiGroup\s+(\w.*)/
            },
            Description: {
                pattern: /@apiDescription\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/
            },
            Param: {
                pattern: /@apiParam\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
                options: { isCode: true }
            },
            ParamExample: {
                pattern: /@apiParamExample\s+((.|[\r\n])*?(?=\s\*?\s\@|\/))/,
                options: { isCode: true }
            },
            Success: {
                pattern: /@apiSuccess\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
                options: { isCode: true }
            },
            SuccessExample: {
                pattern: /@apiSuccessExample\s+((.|[\r\n])*?(?=\s\*?\s\@|\/))/,
                options: { isCode: true }
            },
        }
    }
);

module.exports = TYPES;