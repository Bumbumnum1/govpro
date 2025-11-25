

interface FormSchema{
    onSubmit:()=> void
}
export default function Form({onSubmit}:FormSchema){
  
    return (
        <>
        <div>
            <form onSubmit={onSubmit}>
             
            </form>
        </div>
        </>
    )
}