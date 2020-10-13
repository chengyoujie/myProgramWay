import {Scanner, SyntaxKind } from "./Scanner"
import {Node, Parser } from "./Parser"
import { Emitter } from "./Emitter";

export function run()
{
    // let scanner = new Scanner();
    // let scannerTime = new Date().getTime();
    // scanner.setText("T(Math).pow($CHAPTER_LEVEL$/50.0,  2)  *400+T(Math).ceil($CHAPTER_LEVEL$/100.0)*2000+$CHAPTER_LEVEL$*560")
    // while(scanner.getToken() != SyntaxKind.EndOfFileToken)
    // {
    //     scanner.scan();
    //     // console.log("发现token: "+ "type: "+ scanner.getToken()+"  text: "+scanner.getTokenText());
    // }
    // let scannerEndTime = new Date().getTime();
    // console.log("解析Scanner时间： "+(scannerEndTime - scannerTime)+"ms")
    // let parser = new Parser();
    // let params = {CHAPTER_LEVEL:2}
    // parser.registerFormulaObj("Math", Math);
    // // parser.parser("T(Math).pow($CHAPTER_LEVEL$/50.0,  2)  *400+T(Math).ceil($CHAPTER_LEVEL$/100.0)*2000+$CHAPTER_LEVEL$*560", params)
    // let node:Node = parser.parser("-375*T(Math).ceil($WING_SKILL$/10.0)*($WING_SKILL$-5*T(Math).ceil($WING_SKILL$/10.0)+5)")
    // console.log(node)

    let params = {WING_SKILL:2, FASHION_STAR:3, CHAPTER_LEVEL:4}
    let emitter = new Emitter();
    // let formula = "8-5*3+21";//test==6错误
    // let formula = "1+2*(3/4)*5+6/7";//test==9错误
    // let formula = "-2-1+((2-1*((2/1))+5/2+1-2+1)*2+3-9+8*2+22/33*44*(3+4/2+14/7-42*6))-44";//
    // let formula = "T(Math).pow($CHAPTER_LEVEL$/50.0,  2)*400+T(Math).ceil($CHAPTER_LEVEL$/100.0)*2000+$CHAPTER_LEVEL$*560"
    let formula = "T(Math).ceil($WING_SKILL$/5.0)*($WING_SKILL$-2.5*T(Math).ceil($WING_SKILL$/5.0)+2.5)+T(Math).floor($WING_SKILL$/5.0)+$WING_SKILL$*5-5";
    let startTime = new Date().getTime();
    emitter.eval(formula, params)
    let endTime = new Date().getTime();
    console.log("首次运算时间："+(endTime - startTime)+"ms");
    emitter.eval(formula, params)
    let endTime2 = new Date().getTime();
    console.log("再次运算耗时："+(endTime2 - endTime)+"ms")

    for(let key in params)
    {
        let reg = new RegExp("\\$"+key+"\\$", "gi");
        formula = formula.replace(reg, params[key]);
    }
    formula = formula.replace(/T\(Math\)/gi, "Math");
    let startEvalTime = new Date().getTime();
    console.log("eval计算结果:"+eval(formula));
    let endEvalTime = new Date().getTime();
    console.log("eval运算耗时："+(endEvalTime-startEvalTime)+"ms");

}
run();