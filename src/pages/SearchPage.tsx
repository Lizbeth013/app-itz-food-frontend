import { useSearchRestaurantes } from '@/api/RestauranteApi';
import LoadingButton from '@/components/LoadingButton';
import SearchResultCard from '@/components/Search/SearchResultCard';
import type { SearchForm } from '@/components/Search/SearchBar';
import SearchBar from '@/components/Search/SearchBar';
import SearchResultInfo from '@/components/Search/SearchResultInfo';
import { useState } from 'react';
import { useParams } from 'react-router';
import CuisinesFilter from '@/components/Search/CuisinesFilter';
import SortOptionsDropdown from '@/components/Search/SortOptionsDropdown';

export type SearchState ={
    searchQuery: string;
    page: number;
    selectedCuisines: string[];
    sortOptions: string;
}

export default function SearchPage() {
    const { city } = useParams();
     const [searchState, setSearchState] = useState<SearchState>(
        {
            searchQuery: "" ,
            page:1,
            selectedCuisines: [],
            sortOptions:"bestMatch"
        });
        
const [ isExpanded, setIsExpaded]=useState<boolean>(false);
 const { data: results, isLoading } = useSearchRestaurantes(searchState, city);

 //Funion setSortOptions reestablece los valores del ordenamiento
 const setSortOptions=(sortOptions: string)=>{
            setSearchState((prevstate)=>({
                ...prevstate,
                sortOptions,
                page:1
            }))
        };//Fin de setSortOptions

        const setSelectedCuisines=(selectedCuisines: string [])=>{
            setSearchState((prevstate)=>({
                ...prevstate,
                selectedCuisines,
                page:1
            }))
        }

    const setSearchQuery = (searchFormData: SearchForm)=>{
        setSearchState((prevState)=>({
            ...prevState,
            searchQuery: searchFormData.searchQuery
        }))

    }

    const resetSearch = ()=>{
        setSearchState((prevState)=>({
            ...prevState,
            searchQuery: ""
        }))

    }
    if(isLoading)
         <LoadingButton/>
    if(!results?.data || !city){
        return <span>¡No hay resultados!</span>
    }

    return (
       <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
        <div id='cuisines_list'>
            <CuisinesFilter
            selectedCuisines={searchState.selectedCuisines}
            onChange={setSelectedCuisines}
            isExpanded={isExpanded}
            onExpandedClick={()=>setIsExpaded(
                (prevIsExpanded)=>!prevIsExpanded
            )}
            />
        </div>
        <div id='main-content'
        className='flex flex-col gap-5'>
            <SearchBar 
            searchQuery={searchState.searchQuery}
            onSubmit={setSearchQuery}
            placeHolder='Busqueda por cocina o nombre del restaurate'
            onReset={resetSearch}/>
        <div className='flex justify-between flex-col gap-3 lg:flex-row'>
            <SearchResultInfo
            total={results.pagination.total}
            city={city as string}
            />
            <SortOptionsDropdown
            sortOptions={searchState.sortOptions}
            onChange={(value)=>setSortOptions(value)}
            />
            </div>
            {
                results.data.map((restaurante, key)=>(
                    <SearchResultCard restaurante={restaurante} key={key}/>
                ))
            }
        </div>
       </div>
    )
}
