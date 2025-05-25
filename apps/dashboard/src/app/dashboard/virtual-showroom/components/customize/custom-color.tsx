"use client";

import { Input, InputContainer } from "@kristall/ui/input";
import { Label } from "@kristall/ui/label";
import { useDebouncedCallback } from "use-debounce";
import { usePreview } from "./preview-context";
import { PreviewSave } from "./preview-save";

const WAIT_BETWEEN_TYPING_COLOR = 200;

export function CustomColor() {
	const {
		setPreviewColor,
		previewColor,
		setHasStateChanged,
		hasColorChanged,
		setHasColorChanged,
	} = usePreview();

	const debounce = useDebouncedCallback((value: string) => {
		setPreviewColor(value);
		setHasStateChanged(true);
		setHasColorChanged(true);
	}, WAIT_BETWEEN_TYPING_COLOR);

	return (
		<div className="flex gap-6 items-end">
			<InputContainer className="w-[200px]">
				<Label>Color principal</Label>
				<Input
					type="color"
					name="customColor"
					defaultValue={previewColor}
					onChange={(e) => debounce(e.target.value)}
				/>
			</InputContainer>
			{hasColorChanged && <PreviewSave />}
		</div>
	);
}
