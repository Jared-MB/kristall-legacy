"use client";
import { Button } from "@nextui-org/button";
import { useTheme } from "next-themes";

import { BsMoon, BsSun } from "react-icons/bs";
export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();

	const handleTheme = () => {
		if (theme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	};

	return (
		<Button onClick={handleTheme} isIconOnly variant="light">
			<BsSun className="inline-block w-4 h-4 dark:hidden" />
			<BsMoon className="w-4 h-4 hidden dark:inline-block" />
		</Button>
	);
}
