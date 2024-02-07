/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable prettier/prettier */
import ArrowIcon from '@assets/icons/arrow-icon.png';
import BigStepIcon from '@assets/icons/big-step-arrow-icon.png';
import BPaginationShape from '@models/enums/BPaginationShapeEnum';
import React, { useEffect, useState } from 'react';

interface BPaginationPropsTypes {
	btnShape?: BPaginationShape;
	disabled?: boolean;
	pageCount: number;
	currentPage?: number;
	bigStep?: boolean;
	handlePageChange: (page: number) => void;
}

const BPagination = (props: BPaginationPropsTypes) => {
	const {
		btnShape,
		disabled,
		pageCount,
		currentPage,
		bigStep,
		handlePageChange
	} = props;

	const [pages, setPages] = useState<string[]>([]);
	const [curPage, setCurrentPage] = useState<number>(1);

	const prepareBtnShape = () => btnShape ? '5px' : '50%';

	const showCurrentBtn = (value: number) => value === curPage ? 1 : 0.7;

	const prepareVisibleBtnsArray = (current: number) => {
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
		setCurrentPage(+page)
		prepareVisibleBtnsArray(+page)
		handlePageChange(+page);
	}

	const handleNextClick = () => {
		if (curPage < Number(pages.at(-1))) {
			setCurrentPage(curPage + 1);
			handlePageChange(curPage + 1);
			if (Number(pages.at(-1)) - curPage > 3) prepareVisibleBtnsArray(curPage + 1);
		}
	}

	const handlePrevClick = () => {
		if (curPage - 1 > 0) {
			setCurrentPage(curPage - 1);
			handlePageChange(curPage - 1);
			if (Number(pages.at(-1)) - curPage > 3) prepareVisibleBtnsArray(curPage - 1);
		} else setCurrentPage(1)
	}

	const renderVisibleBtnsArray = () => {
		const pagesLine = pages.map((page, index) => {
			return (
				<button
					key={index}
					data-testid={'pageControl' + page}
					style={{ borderRadius: prepareBtnShape(), opacity: showCurrentBtn(+page) }}
					onClick={() => handleClickOnPage(page, disabled)}
				>
					{page}
				</button>
			)
		})

		return pagesLine
	}

	const doBigStepToLastPage = () => {
		setCurrentPage(Number(pages.at(-1)));
		if (Number(pages.at(-1)) - curPage > 3) prepareVisibleBtnsArray(Number(pages.at(-1)) - 3);
		handlePageChange(pageCount);
	}

	const doBigStepToFirstPage = () => {
		setCurrentPage(1);
		prepareVisibleBtnsArray(1);
		handlePageChange(1);
	}

	useEffect(() => {
		prepareVisibleBtnsArray(curPage);
	}, [pageCount, currentPage]);

	useEffect(() => {
		if (currentPage) setCurrentPage(currentPage)
		else setCurrentPage(1)
	}, []);

	return (
		<div
			data-testid='BPagination'
			style={{
				opacity: disabled ? 0.6 : 1,
				position: 'relative',
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				// backgroundColor: 'red', width: '200px', height: '200px'
			}}
		>
			{bigStep && pageCount > 1
				? <img
					src={BigStepIcon}
					alt='left arrow image'
					style={{ opacity: curPage === 1 ? 0.5 : 1, width: '25px', transform: 'rotate(180deg)', }}
					onClick={doBigStepToFirstPage}
				/>
				: null
			}

			{pageCount > 1
				? <img
					src={ArrowIcon}
					alt="arrow icon"
					data-testid="KeyboardArrowLeftIcon"
					style={{ opacity: curPage === 1 ? 0.5 : 1, width: '25px', transform: 'rotate(180deg)', }}
					onClick={handlePrevClick}
				/>
				: null
			}

			{renderVisibleBtnsArray()}

			{pageCount > 1
				? <img
					src={ArrowIcon}
					alt="arrow icon"
					data-testid="KeyboardArrowRightIcon"
					style={{ opacity: curPage === pageCount ? 0.5 : 1, width: '25px' }}
					onClick={handleNextClick}
				/>
				: null
			}

			{bigStep && pageCount > 1
				? <img
					src={BigStepIcon}
					alt='right arrow image'
					style={{ opacity: curPage === pageCount ? 0.5 : 1, width: '25px' }}
					onClick={doBigStepToLastPage}
				/>
				: null
			}
		</div>
	);
};

export default BPagination;
