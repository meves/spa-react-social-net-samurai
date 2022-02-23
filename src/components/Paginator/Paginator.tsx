import React, { FC, useState } from 'react';
import style from './Paginator.module.css';
import classNames from 'classnames';

export type PaginatorPropsType = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  portionSize?: number
}

const Paginator: FC<PaginatorPropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize=10}) => {
    let pagesCount: number = Math.ceil(totalItemsCount / pageSize);
    const pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    const portionCount: number = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber: number = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber: number = (portionNumber * portionSize) > pagesCount ? pagesCount : (portionNumber * portionSize);

    return (
        <div className={style.paginator}>
            { portionNumber > 1 && 
              <button onClick={() => setPortionNumber(1)}>FIRST</button>}
            { portionNumber > 1 &&   
              <button onClick={ () => {setPortionNumber(portionNumber - 1)} }>PREV</button> }
            { pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
              .map(page => {
                return <span className={classNames({[style.selectedPage]: currentPage === page}, style.pageNumber)} 
                key={page} onClick={ () => {onPageChanged(page)} }>{page}</span>}) }              
              { portionNumber < portionCount &&  
              <button onClick={ () => { setPortionNumber(portionNumber + 1) } }>NEXT</button> }
              { portionNumber < portionCount && 
                <button onClick={() => {setPortionNumber(portionCount)}}>LAST</button>}
        </div>
    );
}

export default Paginator;
