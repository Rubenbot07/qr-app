export const Input = ({ setValue }) => {
    return (
        <div>
            <label htmlFor="input"></label>
            <input  
                placeholder="Enter an url"
                onChange={(e) => setValue(e.target.value)}
                className="h-12  outline-none px-2 text-white placeholder-white" 
                type="text"
                name="input"
                id="input" 
                aria-label="Enter an url"    
            />
        </div>
    )
}