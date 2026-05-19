import SearchBar , {type SearchForm} from '@/components/Search/SearchBar'
import landingImage from '../assets/landing.png'
import {useNavigate} from 'react-router';

export default function HomePage() {
    const navigate= useNavigate();
    const handleSearchSubmit=((searchFormValues:SearchForm)=>{
        navigate({
            pathname: "/search/" + searchFormValues.searchQuery
        })
    })

  return (
    <div className="flex flex-col gap-12">
        <div className="bg-white rounded-lg shadow-md py-8
        flex flex-col gap-5 text-center
        -mt-16"
>
    <h1 className="text-5xl font-bold tracking-tight
    text-orange-600">
        Disfruta de tu comida para llevar
    </h1>
    <span className="text-x1">
    ¡Tu comida esta a solo un click!
    </span>
<SearchBar
placeHolder='Busca por ciudad o pais'
onSubmit={handleSearchSubmit} />
    <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage}/>
    <div className='flex flex-col items-center
    justify-center gap-4 text-center'>
    <span className='font-bold text-3xl tracking-tighter'>
        Pide tu comida para llevar aun mas rapido
    </span>
    </div>
    </div>
</div>
      
    </div>
  )
}
