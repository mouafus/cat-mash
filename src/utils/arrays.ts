export function chunk<T> (arr: T[]): Array<Array<T>>{
    const result = [];
    let curr = [];

    for(let i=0; i<arr.length; i++){
        if(curr.length === 2){
            result.push(curr);
            curr = [];
        }
        curr.push(arr[i])
    }

    if(curr.length > 0){
        result.push([...curr, arr[0]])
    }

    return result
}

export function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}