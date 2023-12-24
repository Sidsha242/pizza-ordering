

export default function MenuItem()
{
    return(
        <div className="bg-gray-300 p-4 rounded-lg text-center hover:bg-white hover:shadow-2xl hover:shadow-black/50 transition-all">
        <img src="/pizza.png" alt='pizza'/>
        <h4 className="font-semibold text-xl my-2">Farmhouse Pizza</h4>
        <p className="text-gray-500 text-sm">
            Esse dolor duis aliqua ipsum dolore nulla id labore est irure enim enim cillum.
        </p>
        <button className="mt-4 bg-primary text-white rounded-full px-8 py-2">
            Add to cart $12
        </button>
        </div>
    );

}