/**
 * 表示时间格式所用的字符
 * y 年份   M 月份   d 天数  h 小时   m 分钟  s秒
 */
export const enum TIME_FORMAT_CHAR{
    Year="y",
    Month="M",
    Day="d",
    Hour="h",
    Minutes="m",
    Second="s",
}
/**
 * 表示时间格式所用的字符数组列表
 * y 年份   M 月份   d 天数  h 小时   m 分钟  s秒
 */
export let TIME_FORMAT_CHARS: TIME_FORMAT_CHAR[] = [TIME_FORMAT_CHAR.Year, TIME_FORMAT_CHAR.Month, TIME_FORMAT_CHAR.Day, TIME_FORMAT_CHAR.Hour, TIME_FORMAT_CHAR.Minutes, TIME_FORMAT_CHAR.Second];

/**
* DateUtil  时间类
* made by cyj
* create on 2022-06-07 11:24:32 
*/
export class DateUtil{

    /**
     * 存储`TIME_FORMAT_CHARS`对应的正则
     */
    private static _timeFormatRegDic:{[key:string]:RegExp}={};
    
    constructor(){
        
    }

    /**
     * 获取`TIME_FORMAT_CHAR`对应的正则
     * @param key TIME_FORMAT_CHAR
     * @returns 
     */
    private static getTimeFormatReg(key:TIME_FORMAT_CHAR){
        if(!this._timeFormatRegDic[key]){
            this._timeFormatRegDic[key] = new RegExp("(" + key + "+)", "g");
        }else{
            this._timeFormatRegDic[key].lastIndex = -1;
        }
        return this._timeFormatRegDic[key];
    }

    /**
     * 根据剩余时间或者Date获取对应格式的字符串
     * @param time          剩余时间或者Date
     * @param format        时间格式  yyyy-MM-dd hh:mm:ss 
     * @param hideZero      是否隐藏前面为零的数字如 `00小时00分10秒` 隐藏后为 `10秒`
     * @returns 
     */
    public static getTimeStr(time: number|Date, format:string="hh:mm:ss", hideZero?:boolean): string {
        let startIndex = -1;//记录第一次出现时间符号的位置
        let findNotZero=false;//是否出现有非零的时间
        for(let i=0; i<TIME_FORMAT_CHARS.length; i++){
            let key = TIME_FORMAT_CHARS[i];
            let reg = this.getTimeFormatReg(key);
            if(reg.test(format))
            {
                let value = this.getTimeValueByFormatKey(time, key, startIndex!=-1);
                let valueStr = value + "";
                if(startIndex==-1)startIndex = reg.lastIndex-RegExp.$1.length;//记录第一次出现时间符号的位置
                if(hideZero){//隐藏前面为零的值
                    if(!value){
                        if(!findNotZero)continue;
                    }else{
                        if(!findNotZero) //截取掉从第一次出现时间相关符号到有非零值之间的字符  如 `剩余00时00分10秒` -> `剩余10秒`
                            format = format.substring(0,  startIndex)+format.substring(reg.lastIndex-RegExp.$1.length);
                        findNotZero = true;
                    }
                }
                if(key == TIME_FORMAT_CHAR.Year){
                    format = format.replace(RegExp.$1, valueStr.substr(4 - RegExp.$1.length));
                }else{
                    format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? valueStr : ("00" + valueStr).substr(valueStr.length));
                }
            }
        }
        return format;
    }

    /**
     * 根据`TIME_FORMAT_CHAR`的字段获取对应的时间数值
     * @param date          剩余时间或者Date
     * @param formatKey     显示时间格式的字符`TIME_FORMAT_CHAR`类型
     * @param remainder     是否取余  如: `63秒` `remainder` 为`true`后显示`3秒`
     * @returns `number`
     */
    private static getTimeValueByFormatKey(date:number|Date, formatKey:TIME_FORMAT_CHAR, remainder?:boolean){
        if(typeof date == "number"){
            switch(formatKey){
                case TIME_FORMAT_CHAR.Second:date=Math.floor(date/1000);return remainder?date%60:date;
                case TIME_FORMAT_CHAR.Minutes:date=Math.floor(date/60000);return remainder?date%60:date;
                case TIME_FORMAT_CHAR.Hour:date=Math.floor(date/3600000);return remainder?date%12:date;
                case TIME_FORMAT_CHAR.Day:date=Math.floor(date/86400000);return remainder?date%30:date;
                case TIME_FORMAT_CHAR.Month:return date;//不支持月
                case TIME_FORMAT_CHAR.Year:return date;//不支持年
                default:return 0;
            }
        }else{
            switch(formatKey){
                case TIME_FORMAT_CHAR.Second:return date.getSeconds();
                case TIME_FORMAT_CHAR.Minutes:return date.getMinutes();
                case TIME_FORMAT_CHAR.Hour:return date.getHours();
                case TIME_FORMAT_CHAR.Day:return date.getDate();
                case TIME_FORMAT_CHAR.Month:return date.getMonth()+1;
                case TIME_FORMAT_CHAR.Year:return date.getFullYear();
                default:return 0;
            }
        }
    }
    
}