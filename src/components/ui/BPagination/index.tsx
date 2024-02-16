/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable prettier/prettier */
import ArrowIcon from '@assets/icons/arrow-icon.png';
import BigStepIcon from '@assets/icons/big-step-arrow-icon.png';
import React, { useEffect, useState } from 'react';

interface BPaginationPropsTypes {
	disabled?: boolean;
	pageCount: number;
	currentPage: number;
	bigStep?: boolean;
	handlePageChange: (page: number) => void;
}

const BPagination = (props: BPaginationPropsTypes) => {
	const {
		disabled,
		pageCount,
		currentPage,
		bigStep,
		handlePageChange
	} = props;

	const [pages, setPages] = useState<string[]>([]);

	const showCurrentBtn = (value: number) => value === currentPage ? 1 : 0.7;

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
		if (page === String(currentPage)) return
		prepareVisibleBtnsArray(+page)
		handlePageChange(+page);
	}

	const handleNextClick = () => {
		if (currentPage < Number(pages.at(-1))) {
			handlePageChange(currentPage + 1);
			if (Number(pages.at(-1)) - currentPage > 3) prepareVisibleBtnsArray(currentPage + 1);
		}
	}

	const handlePrevClick = () => {
		if (currentPage - 1 > 0) {
			handlePageChange(currentPage - 1);
			if (Number(pages.at(-1)) - currentPage > 3) prepareVisibleBtnsArray(currentPage - 1);
		}
	}

	const renderVisibleBtnsArray = () => {
		const pagesLine = pages.map((page, index) => {
			return (
				<button
					key={index}
					data-testid={'pageControl' + page}
					style={{ borderRadius: '50%', opacity: showCurrentBtn(+page) }}
					onClick={() => handleClickOnPage(page, disabled)}
				>
					{page}
				</button>
			)
		})

		return pagesLine
	}

	const doBigStepToLastPage = () => {
		if (Number(pages.at(-1)) - currentPage > 3) prepareVisibleBtnsArray(Number(pages.at(-1)) - 3);
		handlePageChange(pageCount);
	}

	const doBigStepToFirstPage = () => {
		prepareVisibleBtnsArray(1);
		handlePageChange(1);
	}

	useEffect(() => {
		prepareVisibleBtnsArray(currentPage);
	}, [pageCount, currentPage]);

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
					style={{ opacity: currentPage === 1 ? 0.5 : 1, width: '25px', transform: 'rotate(180deg)', }}
					onClick={doBigStepToFirstPage}
				/>
				: null
			}

			{pageCount > 1
				? <img
					src={ArrowIcon}
					alt="arrow icon"
					data-testid="KeyboardArrowLeftIcon"
					style={{ opacity: currentPage === 1 ? 0.5 : 1, width: '25px', transform: 'rotate(180deg)', }}
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
					style={{ opacity: currentPage === pageCount ? 0.5 : 1, width: '25px' }}
					onClick={handleNextClick}
				/>
				: null
			}

			{bigStep && pageCount > 1
				? <img
					src={BigStepIcon}
					alt='right arrow image'
					style={{ opacity: currentPage === pageCount ? 0.5 : 1, width: '25px' }}
					onClick={doBigStepToLastPage}
				/>
				: null
			}
		</div>
	);
};

export default BPagination;
