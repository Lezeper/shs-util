const TYPES = [];

TYPES.push(
    {
        isSingleDoc: true, 
        type: 'module', 
        group: '@module',
        templateFilePath: __dirname + '/temp_module.js',
        properties: {
            Name: {
                pattern: /@moduleName\s+(\w.*)/,
                required: true
            },
            Version: {
                pattern: /@moduleVersion\s+(\w.*)/,
                required: true
            },
            Group: {
                pattern: /@moduleGroup\s+(\w.*)/,
                required: true
            },
            Description: {
                pattern: /@moduleDescription\s+((.|[\r\n])*?\**(?=\s\*\s\s|\s\*\s\@|\/\r\n))/,
                required: false
            },
            Dependency: {
                pattern: /@moduleDependency\s+((.|[\r\n])*?\**(?=\s\*\s\s|\s\*\s\@|\/\r\n))/,
                required: false
            },
            Usage: {
                pattern: /@moduleUsage\s+((.|[\r\n])*?\**?(?=\s\*\S|\s\*\s\@|\/\r\n))/,
                required: true,
                options: { isCode: true }
            },
            Warning: {
                pattern: /@moduleWarning\s+((.|[\r\n])*?\**?(?=\s\*\S|\s\*\s\@|\/\r\n))/,
                required: false,
                options: { isWarning: true }
            }
        }
    }
);
TYPES.push(
    {
        isSingleDoc: true,
        type: 'mqtt', 
        group: '@mqtt',
        templateFilePath: __dirname + '/temp_mqtt.js',
        properties: {
            Name: {
                pattern: /@mqttName\s+(\w.*)/,
                required: true
            },
            Version: {
                pattern: /@mqttClientVersion\s+(\w.*)/,
                required: true
            },
            BrokerUrl: {
                pattern: /@mqttBrokerUrl\s+([\/\w].*)/,
                required: true
            },
            Description: {
                pattern: /@mqttDescription\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
                required: true
            },	
            Subscribe: {
                pattern: /@mqttSubscribe\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
                required: false
            },
            Publish: {
                pattern: /@mqttPublish\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
                required: false
            },
        }
    }
);
TYPES.push(
    {
        isSingleDoc: false, 
        type: 'api', 
        group: '@api',
        templateFilePath: __dirname + '/temp_api.js',
        properties: {
            Name: {
                pattern: /@apiName\s+(\w.*)/,
                required: true
            },
            Method: {
                pattern: /@apiMethod\s+(\w.*)/,
                required: true
            },
            Url: {
                pattern: /@apiUrl\s+([\/\w].*)/,
                required: true
            },
            Version: {
                pattern: /@apiVersion\s+(\w.*)/,
                required: true
            },
            Group: {
                pattern: /@apiGroup\s+(\w.*)/,
                required: true
            },
            Description: {
                pattern: /@apiDescription\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
                required: false
            },
            Param: {
                pattern: /@apiParam\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
                required: false,
                options: { isCode: true }
            },
            ParamExample: {
                pattern: /@apiParamExample\s+((.|[\r\n])*?(?=\s\*?\s\@|\/))/,
                required: false,
                options: { isCode: true }
            },
            Success: {
                pattern: /@apiSuccess\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
                required: false,
                options: { isCode: true }
            },
            SuccessExample: {
                pattern: /@apiSuccessExample\s+((.|[\r\n])*?(?=\s\*?\s\@|\/))/,
                required: false,
                options: { isCode: true }
            },
        }
    }
);

module.exports = TYPES;