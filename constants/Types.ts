export type NavigationTab = 'home' | 'rewards' | 'wallet' | 'profile';

export interface Deal {
    id: number;
    title: string;
    subtitle: string;
    price?: string;
    image: string;
    tag?: string;
    discount?: string;
    fullWidth?: boolean;
}

export interface UserState {
    name: string;
    stamps: number;
    maxStamps: number;
    balance: number;
    freeCoffees: number;
}

export interface TabItem {
    id: NavigationTab;
    label: string;
    icon: string;
    iconFilled: string;
}
