import type { Component } from 'svelte';

export type Column<Data extends {}> = {
	header: string;
	key: keyof Data;
	cell: Component<any>;
};
