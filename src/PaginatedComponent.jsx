import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { PaginationItem } from '@material-ui/lab';
import { Link, useLocation } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import queryString from 'query-string';

const PaginatedComponent = (props) => {
    const { match } = props;
    const { history } = props;
    const { location } = props;
    const { search } = location;
    const { params } = match;
    let { page } = queryString.parse(search);    
    if (page === undefined) page = 1

    const limit = 10;
    const [pokemonData, setPokemonData] = useState(undefined);
    const [totalPages, setTotalPages] = useState(undefined);
    const [actualPage, setActualPage] = useState(page);
    const [nextPage, setNextPage] = useState(actualPage + 1);
    const [previousPage, setPreviousPage] = useState(null);
    //if(pathname === '/pokemon' || pathname === '/') pathname = `/pokemon/page/${actualPage}`;
    useEffect(() => {
        setPokemonData(undefined);
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(limit * page) - limit}`)
            .then(function (response) {
                console.log(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(limit * page) - limit}`)
                const { data } = response;
                const { count } = data;
                const { results } = data;
                const newPokemonData = {};
                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id: ((limit * page) - limit) + index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${((limit * page) - limit) + index + 1}.png`
                    }
                });
                setPokemonData(newPokemonData);
                let totalPages = Math.ceil(count / limit);
                setTotalPages(totalPages);
                //history.push(`${pathname}`)
                setActualPage(page);

            });
    }, [/*actualPage,*/ page]);
    //console.log(pokemonData)
    /*console.log(props)
    console.log(`Total:${totalPages}`);
    console.log(`Actual:${actualPage}`);
    console.log(`Next:${nextPage}`);
    console.log(`Previous:${previousPage}`);
    console.log(`PageNumber:${page}`);*/
    //console.log(`${pathname}`);

    const handlePageChange = (event, page) => {
        //setActualPage(page);
        console.log("changing")
        page !== totalPages ? setNextPage(page + 1) : setNextPage(null);
        page !== 1 ? setPreviousPage(page - 1) : setPreviousPage(null);
        //pathname = `/pokemon?page=${page}`;
        //history.push(`${pathname}`)
    }

    return (
        <>
            {
                pokemonData ?
                    Object.keys(pokemonData).map((pokemon, index) => (
                        <Typography key={index}>{pokemonData[pokemon].id} . {pokemonData[pokemon].name}</Typography>
                    ))
                    : <Typography>Loading...</Typography>
            }

            {
                totalPages > 0 ?

                    <Pagination
                        count={totalPages}
                        page={parseInt(actualPage)}
                        defaultPage={1}
                        onChange={handlePageChange}
                        renderItem={(item) => (
                            <PaginationItem
                                component={Link}
                                to={`/pokemon${item.page === 1 ? `?page=${item.page}` : `?page=${item.page}`}`}
                                {...item}
                            />
                        )}
                    />
                    :
                    undefined

            }
        </>

    );
}

export default PaginatedComponent;