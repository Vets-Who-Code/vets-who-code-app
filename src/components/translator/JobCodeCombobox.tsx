import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { JobCodeEntry, BranchKey } from "@/types/job-codes";

/** Map display branch names to BranchKey values */
const BRANCH_NAME_MAP: Record<string, BranchKey> = {
	"U.S. Army": "army",
	"U.S. Navy": "navy",
	"U.S. Air Force": "air_force",
	"U.S. Marine Corps": "marine_corps",
	"U.S. Coast Guard": "coast_guard",
};

const BRANCH_LABELS: Record<BranchKey, string> = {
	army: "Army",
	navy: "Navy",
	air_force: "Air Force",
	marine_corps: "Marine Corps",
	coast_guard: "Coast Guard",
};

interface JobCodeComboboxProps {
	jobCodeIndex: JobCodeEntry[];
	selectedBranch: string;
	value: string;
	onChange: (value: string) => void;
	onSelect: (entry: JobCodeEntry) => void;
	id?: string;
	className?: string;
	placeholder?: string;
}

const MAX_RESULTS = 20;

const JobCodeCombobox: React.FC<JobCodeComboboxProps> = ({
	jobCodeIndex,
	selectedBranch,
	value,
	onChange,
	onSelect,
	id = "jobTitle",
	className,
	placeholder = "e.g., 11B, Hospital Corpsman, 1N0X1",
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
	const containerRef = useRef<HTMLDivElement>(null);
	const listboxRef = useRef<HTMLUListElement>(null);

	const branchKey = BRANCH_NAME_MAP[selectedBranch] ?? null;

	const filtered = useMemo(() => {
		if (!value.trim()) return [];
		const query = value.trim().toUpperCase();
		const results: JobCodeEntry[] = [];

		for (const entry of jobCodeIndex) {
			if (branchKey && entry.branch !== branchKey) continue;
			if (entry.code.toUpperCase().startsWith(query)) {
				results.push(entry);
				if (results.length >= MAX_RESULTS) break;
			}
		}

		return results;
	}, [jobCodeIndex, branchKey, value]);

	const showDropdown = isOpen && filtered.length > 0;

	useEffect(() => {
		setActiveIndex(-1);
	}, [filtered]);

	const handleSelect = useCallback(
		(entry: JobCodeEntry) => {
			onChange(entry.code);
			onSelect(entry);
			setIsOpen(false);
		},
		[onChange, onSelect]
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (!showDropdown) return;

			switch (e.key) {
				case "ArrowDown":
					e.preventDefault();
					setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
					break;
				case "ArrowUp":
					e.preventDefault();
					setActiveIndex((i) => Math.max(i - 1, 0));
					break;
				case "Enter":
					if (activeIndex >= 0 && activeIndex < filtered.length) {
						e.preventDefault();
						handleSelect(filtered[activeIndex]);
					}
					break;
				case "Escape":
					e.preventDefault();
					setIsOpen(false);
					break;
			}
		},
		[showDropdown, filtered, activeIndex, handleSelect]
	);

	useEffect(() => {
		if (activeIndex >= 0 && listboxRef.current) {
			const item = listboxRef.current.children[activeIndex] as HTMLElement | undefined;
			item?.scrollIntoView({ block: "nearest" });
		}
	}, [activeIndex]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div ref={containerRef} className="tw-relative">
			<input
				id={id}
				type="text"
				role="combobox"
				aria-expanded={showDropdown}
				aria-autocomplete="list"
				aria-controls={`${id}-listbox`}
				aria-activedescendant={activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
				autoComplete="off"
				value={value}
				placeholder={placeholder}
				className={className}
				onChange={(e) => {
					onChange(e.target.value);
					setIsOpen(true);
				}}
				onFocus={() => setIsOpen(true)}
				onKeyDown={handleKeyDown}
			/>
			{showDropdown && (
				<ul
					id={`${id}-listbox`}
					ref={listboxRef}
					role="listbox"
					className="tw-absolute tw-z-50 tw-mt-1 tw-max-h-60 tw-w-full tw-overflow-auto tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-shadow-lg"
				>
					{filtered.map((entry, i) => (
						<li
							key={`${entry.branch}:${entry.code}`}
							id={`${id}-option-${i}`}
							role="option"
							aria-selected={i === activeIndex}
							className={`tw-cursor-pointer tw-px-4 tw-py-2 tw-text-sm ${
								i === activeIndex
									? "tw-bg-[#091f40] tw-text-white"
									: "tw-text-[#091f40] hover:tw-bg-gray-100"
							}`}
							onMouseDown={(e) => e.preventDefault()}
							onClick={() => handleSelect(entry)}
						>
							<span className="tw-font-semibold">{entry.code}</span>
							<span className="tw-ml-2 tw-text-xs tw-opacity-70">
								{BRANCH_LABELS[entry.branch]}
							</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default JobCodeCombobox;
