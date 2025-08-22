const currency ="€"

export default function toMoney(amount : number) : string {
    if (amount >= 0){ 
        return `${currency}${amount.toLocaleString()}`
    }
    else{
        return `-${currency}${Math.abs(amount).toLocaleString()}`
    }
}