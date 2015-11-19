# node-metrics

Utility class for measuring elapsed time for performance testing. Performace
is measured natively as microtime which can be converted to milliseconds or
seconds. This is meant to be thin and minimal fo measuring execution times
delegated by the user of this module.



**Example:**
```js
//Measure and track a particular metric
var myMetrics = require('metric');
var guid = myMetrics.start();
//... perform tasks over time ...
var elapsed = myMetrics.stop(guid);
//elapsed now equals the time in microseconds of tasks performed.
```

* * *

### node-metrics.start(guid, callback) 

create a new metric to add to metrics object. If passed no guid, a valid
v4 uuid is generated.

**Parameters**

**guid**: `string`, optional guid string to identify metric.

**callback**: `function`, optional standard node callback function.

**Returns**: `string`, guid identifier for current metric measurement.


### node-metrics.stop(guid, callback) 

Utility class for measuring elapsed time for performance testing. Performace
is measured natively as microtime which can be converted to milliseconds or
seconds. This is meant to be thin and minimal fo measuring execution times
delegated by the user of this module.

**Parameters**

**guid**: `string`, [description]

**callback**: `function`, [description]

**Returns**: `integer`, [description]


### node-metrics.getAllMetrics(callback) 

return all the added/registered metric measurements.

**Parameters**

**callback**: `function`, optional node callback.

**Returns**: `Object`, Object literal representation of all metrics.


### node-metrics.clear(guid, callback) 

Removes one or all metrics in collection.

**Parameters**

**guid**: `string`, optional guid of metric measurement to delete.

**callback**: `function`, optional NodeJS callback function.

**Returns**: `Boolean`, truth if success, false otherwise.


### node-metrics.isValidGuid(guid) 

Validate guid is not falsey and exists in the metrics collection.

**Parameters**

**guid**: `string`, guid to validate

**Returns**: `Boolean`, true if valid and found, false otherwise



* * *










