const TYPES = [];

/* Constant Value */
const STRING = 'string';
const OBJECT = 'object';
const JSON = 'json';

TYPES.push(
    {   
        // only one main document comment on the file
        isSingleDoc: true,
        subDocProperties: {
            Api: {
                propertyName: '@moduleApiName',
                pattern: /@moduleApiName\s+(\w.*)/,
                type: STRING,
                isMulti: false,
                required: true
            },
            Returns: {
                propertyName: '@moduleApiReturns',
                pattern: /@moduleApiReturns\s+(\w.*)/,
                type: STRING,
                isMulti: false,
                required: true
            },
            Param: {
                propertyName: '@moduleApiParam',
                pattern: /@moduleApiParam\s+((.|[\r\n])*?\**(?=\s\*\s\s))/,
                type: JSON,
                isMulti: true,
                required: false
            },
            Example: {
                propertyName: '@moduleApiExample',
                pattern: /@moduleApiExample\s+((.|[\r\n])*?\**?(?=\s\*\S|\s\*\s\@|\/\r\n))/,
                type: STRING,
                isMulti: false,
                required: false,
                options: { isCode: true }
            }
        },
        type: 'module', 
        group: '@module',
        subGroup: '@moduleApi', // for sub properties
        templateFilePath: __dirname + '/temp_module.js',
        properties: {
            Name: {
                propertyName: '@moduleName',
                pattern: /@moduleName\s+(\w.*)/,
                type: STRING,
                isMulti: false,
                required: true
            },
            Version: {
                propertyName: '@moduleVersion',
                pattern: /@moduleVersion\s+(\w.*)/,
                type: STRING,
                isMulti: false,
                required: true
            },
            Group: {
                propertyName: '@moduleGroup',
                pattern: /@moduleGroup\s+(\w.*)/,
                type: STRING,
                isMulti: false,
                required: true
            },
            Description: {
                propertyName: '@moduleDescription',
                pattern: /@moduleDescription\s+((.|[\r\n])*?\**(?=\s\*\s\s|\s\*\s\@|\/\r\n))/,
                type: STRING,
                isMulti: false,
                required: false
            },
            Dependency: {
                propertyName: '@moduleDependency',
                pattern: /@moduleDependency\s+((.|[\r\n])*?\**(?=\s\*\s\s|\s\*\s\@|\/\r\n))/,
                type: STRING,
                isMulti: false,
                required: false
            },
            Usage: {
                propertyName: '@moduleUsage',
                pattern: /@moduleUsage\s+((.|[\r\n])*?\**?(?=\s\*\S|\s\*\s\@|\/\r\n))/,
                type: STRING,
                isMulti: false,
                required: true,
                options: { isCode: true }
            },
            Warning: {
                propertyName: '@moduleWarning',
                pattern: /@moduleWarning\s+((.|[\r\n])*?\**?(?=\s\*\S|\s\*\s\@|\/\r\n))/,
                type: STRING,
                isMulti: false,
                required: false,
                options: { isWarning: true }
            }
        }
    }
);
TYPES.push(
    {
        isSingleDoc: true,
        subDoc: null,
        type: 'mqtt', 
        group: '@mqtt',
        templateFilePath: __dirname + '/temp_mqtt.js',
        properties: {
            Name: {
                propertyName: '@mqttName',
                pattern: /@mqttName\s+(\w.*)/,
                type: STRING,
                isMulti: false,
                required: true
            },
            Version: {
                propertyName: '@mqttClientVersion',
                pattern: /@mqttClientVersion\s+(\w.*)/,
                type: STRING,
                isMulti: false,
                required: true
            },
            BrokerUrl: {
                propertyName: '@mqttBrokerUrl',
                pattern: /@mqttBrokerUrl\s+([\/\w].*)/,
                type: STRING,
                isMulti: false,
                required: true
            },
            Description: {
                propertyName: '@mqttDescription',
                pattern: /@mqttDescription\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
                type: STRING,
                isMulti: false,
                required: true
            },	
            Subscribe: {
                propertyName: '@mqttSubscribe',
                pattern: /@mqttSubscribe\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
                type: STRING,
                isMulti: false,
                required: false
            },
            Publish: {
                propertyName: '@mqttPublish',
                pattern: /@mqttPublish\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
                type: STRING,
                isMulti: false,
                required: false
            },
        }
    }
);
TYPES.push(
    {
        isSingleDoc: false, 
        subDoc: null,
        type: 'api', 
        group: '@api',
        templateFilePath: __dirname + '/temp_api.js',
        properties: {
            Name: {
                propertyName: '@apiName',
                pattern: /@apiName\s+(\w.*)/,
                type: STRING,
                isMulti: false,
                required: true
            },
            Method: {
                propertyName: '@apiMethod',
                pattern: /@apiMethod\s+(\w.*)/,
                type: STRING,
                isMulti: false,
                required: true
            },
            Url: {
                propertyName: '@apiUrl',
                pattern: /@apiUrl\s+([\/\w].*)/,
                type: STRING,
                isMulti: false,
                required: true
            },
            Version: {
                propertyName: '@apiVersion',
                pattern: /@apiVersion\s+(\w.*)/,
                type: STRING,
                isMulti: false,
                required: true
            },
            Group: {
                propertyName: '@apiGroup',
                pattern: /@apiGroup\s+(\w.*)/,
                type: STRING,
                isMulti: false,
                required: true
            },
            Description: {
                propertyName: '@apiDescription',
                pattern: /@apiDescription\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
                type: STRING,
                isMulti: false,
                required: false
            },
            Param: {
                propertyName: '@apiParam',
                pattern: /@apiParam\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
                type: STRING,
                isMulti: false,
                required: false,
                options: { isCode: true }
            },
            ParamExample: {
                propertyName: '@apiParamExample',
                pattern: /@apiParamExample\s+((.|[\r\n])*?(?=\s\*?\s\@|\/))/,
                type: STRING,
                isMulti: false,
                required: false,
                options: { isCode: true }
            },
            Success: {
                propertyName: '@apiSuccess',
                pattern: /@apiSuccess\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
                type: STRING,
                isMulti: false,
                required: false,
                options: { isCode: true }
            },
            SuccessExample: {
                propertyName: '@apiSuccessExample',
                pattern: /@apiSuccessExample\s+((.|[\r\n])*?(?=\s\*?\s\@|\/))/,
                type: STRING,
                isMulti: false,
                required: false,
                options: { isCode: true }
            },
        }
    }
);

module.exports = {
    TYPES: TYPES,
    JSON: JSON,
    STRING: STRING,
    OBJECT: OBJECT
};