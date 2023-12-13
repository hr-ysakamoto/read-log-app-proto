import React from "react";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import { FaListUl } from "react-icons/fa6";
import { IconButton } from "@chakra-ui/react";

export type ViewMode = "grid" | "list";

const COLOR_SCHEME = "teal";

export interface ViewToggleButtonProps {
  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
}

export const ViewToggleButton = ({
  viewMode,
  setViewMode,
}: ViewToggleButtonProps) => {
  return (
    <>
      <IconButton
        isRound={true}
        colorScheme={COLOR_SCHEME}
        variant={viewMode === "grid" ? undefined : "outline"}
        aria-label="Grid mode"
        icon={<TfiLayoutGrid3Alt />}
        onClick={() => setViewMode("grid")}
      />
      <IconButton
        isRound={true}
        colorScheme={COLOR_SCHEME}
        variant={viewMode === "list" ? undefined : "outline"}
        aria-label="List mode"
        icon={<FaListUl />}
        onClick={() => setViewMode("list")}
      />
    </>
  );
};
