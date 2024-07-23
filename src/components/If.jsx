export default props => {
    if(props.condition)
        return props.children   //mostre os elementos dentro da tag If
    else
        return false //não retorna nada
}