'use strict';
/** eslint eqeqeq:0
 * 
 */
/**
 * @otherTag
 */
/**
 * @mqttClientId    clientId only one line.
 * 
 * @mqttClientVersion   1.0.0 only one line.
 * 
 * @mqttBrokerUrl   /localhost:3000 one line
 * 
 * @mqttDescription This is description
 * It maybe multiple lines.
 * 
 * @mqttSubscribe   
 * top1
 * top2
 * top3
 * 
 * @mqttPublish     
 * p1
 * p2
 * p3
 * 
 */
function assembleTokens(req, res, customTokens) {
  const arrayUniqueTokens = (array) => {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
          // not === because token can be regexp object

        if (a[i].token == a[j].token) {
          a.splice(j--, 1);
        }
      }
    }
	/* eslint eqeqeq:0 */
    return a;
  };
}