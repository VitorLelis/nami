export default function toMoney(amount : number) : string {
    if (amount >= 0){ 
        return `€${amount.toLocaleString()}`
    }
    else{
        return `-€${Math.abs(amount).toLocaleString()}`
    }
}