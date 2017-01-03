var fs = require('fs');



function parseAndroidStringFile(filePath,callback){
    var readStream = fs.createReadStream("android-diff-ios中文.txt",'utf-8');
    readStream.on('data',function(chuck){
        var strs = chuck.split('\n');
        var strMapArray = new Array();
        for(var pos in strs){
            var originStr = strs[pos];
            var firstKeyIndex = originStr.indexOf('"');
            var endKeyIndex = originStr.indexOf('">');
            if(firstKeyIndex != -1 && endKeyIndex != -1){
                var keyStr = originStr.substring(firstKeyIndex + 1,endKeyIndex);
            }

            var firstValueIndex = originStr.indexOf('>');
            var endValueIndex = originStr.indexOf('</string>');
            if(firstValueIndex != -1 && endValueIndex != -1){
                var valueStr = originStr.substring(firstValueIndex + 1,endValueIndex);
            }

            // console.log(keyStr + ":" + valueStr);
            var strObj = {
            };
            strObj.toString = function(){
                return this.key + ":" + this.value;
            }
            strObj.key = keyStr;
            strObj.value = valueStr;
            strMapArray.push(strObj);
        }

        if(callback != null){
            callback(null,strMapArray);
        }

    });

    readStream.on('end',function(){
        console.log('readFile end.');
    });

    readStream.on('error',function(error){
        console.log('readFile err : ' + error.toString());
        callback(error,null);
    });
}

// parseAndroidStringFile('',function(err,array){
//     if(err != null){

//     }else{
//         console.log(array.toString());
//     }
// });

module.exports = {
    parseAndroidStringFile = parseAndroidStringFile,
}