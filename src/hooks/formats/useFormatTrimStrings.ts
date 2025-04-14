export const FormatTrimStrings = (text:string):string=>{
    const arry = text.split('');

    let characters=0.0;
    let result='';
    for(let i=0;i<arry.length;i++){
        const charCode = arry[i].charCodeAt(0);
        characters += charCode > 255?1 : 0.5;
        result+=arry[i];
        if(characters===11){
            //みなしの文字数が11.0の時
            if(arry[i+1] && arry[i+1].charCodeAt(0) > 255 && arry[i+2]){
                //次の文字が全角(みなしの文字数が1)でさらに次が有るとき
                result +="…";
                break;
            }
            if(arry[i+1] && arry[i+1].charCodeAt(0) < 255 && arry[i+2] && arry[i+2].charCodeAt(0) > 255){
                //次の文字が半角(みなしの文字数が0.5)でさらに次があり、その文字が全角(みなしの文字数が1)で有るとき
                result +="…";
                break;
            }
            if(arry[i+1] && arry[i+1].charCodeAt(0) < 255 && arry[i+2] && arry[i+2].charCodeAt(0) < 255 && arry[i+3]){
                //次の文字が半角(みなしの文字数が0.5)でさらに次があり、その文字が半角(みなしの文字数が0.5)でさらに次の文字がある時
                result +="…";
                break;
            }
        }
        if(characters===11.5){
            //みなしの文字数が11.5の時
            if(arry[i+1] && arry[i+1].charCodeAt(0) > 255){
                // 次の文字があり、その文字が全角(みなしの文字数が1)だった時
                result +="…";
                break;
            }
            if(arry[i+1] && arry[i+1].charCodeAt(0) < 255 && arry[i+2]){
                // 次の文字があり、その文字が半角(みなしの文字数が0.5)でその次の文字が存在しているとき
                result +="…";
                break;
            }
        }
        if(characters===12){
            break;
        }

    }
return result;
}