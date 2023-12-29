/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable prettier/prettier */
import ArrowIcon from '@assets/icons/arrow-icon.png';
import BigStepIcon from '@assets/icons/big-step-arrow-icon.png';
import BPaginationShape from '@models/enums/BPaginationShapeEnum';
import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';

interface BPaginationPropsTypes {
    btnShape?: BPaginationShape;
    disable?: boolean;
    pageCount: number;
    currentPage?: number;
    bigStep?: boolean;
    handlePageChange: Function;
}

const BPagination = (props: BPaginationPropsTypes) => {
    const {
        btnShape,
        disable,
        pageCount,
        currentPage,
        bigStep,
        handlePageChange
    } = props;

    const [pages, setPages] = useState<string[]>([]);
    const [curPage, setCurPage] = useState<number>(1);

    const prepareBtnShape = () => btnShape ? '5px' : '50%';

    const showCurrentBtn = (text: string) => +text === curPage ? 1 : 0.7;

    const prepareBtnsArray = (current: number) => {
        const arrayOfBtnText = [];
        if (pageCount - current >= 0) {
            if (pageCount - current < 5) {
                for (let i = pageCount - 4; i <= pageCount; i++) {
                    if (i > 0) arrayOfBtnText.push(`${i}`);
                }
            } else {
                for (let i = current - 1; i <= pageCount; i++) {
                    if (i > 0) arrayOfBtnText.push(`${i}`);
                }
            }
        } else {
            for (let i = pageCount; i > 0; i--) {
                if (i > 0) arrayOfBtnText.unshift(`${i}`);
            }
        }

        if (arrayOfBtnText.length > 5) {
            arrayOfBtnText.splice(3, arrayOfBtnText.length - 4, '...')
        }

        setPages(arrayOfBtnText);
    }

    const handleClickOnPage = (page: string, disabled: boolean | undefined) => {
        if (disabled) return
        if (page === String(curPage)) return
        setCurPage(+page)
        prepareBtnsArray(+page)
        handlePageChange();
    }

    const handleNextClick = () => {
        if (curPage < Number(pages.at(-1))) {
            setCurPage(curPage + 1);
            if (Number(pages.at(-1)) - curPage > 3) prepareBtnsArray(curPage + 1);
        }
        handlePageChange();
    }

    const handlePrevClick = () => {
        if (curPage - 1 > 0) {
            setCurPage(curPage - 1);
            if (Number(pages.at(-1)) - curPage > 3) prepareBtnsArray(curPage - 1);
        } else setCurPage(1)
        handlePageChange();
    }

    const prepareBtnsLine = () => {
        const pagesLine = pages.map((page, index) => {
            return (
                <button
                    key={index}
                    style={{ borderRadius: prepareBtnShape(), opacity: showCurrentBtn(page) }}
                    onClick={() => handleClickOnPage(page, disable)}
                >
                    {page}
                </button>
            )
        })

        return pagesLine
    }

    const doBigStepToLastPage = () => {
        setCurPage(Number(pages.at(-1)));
        if (Number(pages.at(-1)) - curPage > 3) prepareBtnsArray(Number(pages.at(-1)) - 3);
        handlePageChange();
    }

    const doBigStepToFirstPage = () => {
        setCurPage(1);
        prepareBtnsArray(1);
        handlePageChange();
    }

    useEffect(() => {
        prepareBtnsArray(curPage);
    }, [btnShape, disable, pageCount, currentPage, bigStep]);

    useEffect(() => {
        if (currentPage) setCurPage(currentPage)
        else setCurPage(1)
    }, []);

    return (
        <div
            className={styles.pagination}
            style={{ opacity: disable ? 0.6 : 1 }}
        >
            {bigStep && pageCount > 1
                ? <img
                    src={BigStepIcon}
                    className={styles['left-img']}
                    alt='left arrow image'
                    style={{ opacity: curPage === 1 ? 0.5 : 1 }}
                    onClick={doBigStepToFirstPage}
                />
                : null
            }

            {pageCount > 1
                ? <img
                    src={ArrowIcon}
                    alt="arrow icon"
                    className={styles['left-img']}
                    style={{ opacity: curPage === 1 ? 0.5 : 1 }}
                    onClick={handlePrevClick}
                />
                : null
            }

            {prepareBtnsLine()}

            {pageCount > 1
                ? <img
                    src={ArrowIcon}
                    alt="arrow icon"
                    style={{ opacity: curPage === pageCount ? 0.5 : 1 }}
                    onClick={handleNextClick}
                />
                : null
            }

            {bigStep && pageCount > 1
                ? <img
                    src={BigStepIcon}
                    alt='right arrow image'
                    style={{ opacity: curPage === pageCount ? 0.5 : 1 }}
                    onClick={doBigStepToLastPage}
                />
                : null
            }
        </div>
    );
};

export default BPagination;
