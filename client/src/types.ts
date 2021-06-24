import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FunctionComponent, ReactNode } from 'react';
import { DocumentNode } from '@apollo/client';

export type LoginResult = {
	login: User;
};

export type ScrollProps = {
    enabled: boolean;
}

export type URL = {
    _id: string;
    key: string;
    dest: string;
    createdAt: number;
    updatedAt: number;
};

export type Post = {
    _id: string;
    title: string;
    description: string;
    content: string;
    createdAt: number;
    updatedAt: number;
};

export type User = {
    _id: string;
    username: string;
    password: string;
    bio: string;
    avatar: string;
    createdAt: number;
    updatedAt: number;
}

export type SEOProps = {
    openGraph: {
        [key: string]: string | undefined;
        site?: string;
        title?: string;
        description?: string;
        image?: string;
        url?: string;
        type?: 'article' | 'content';
    }
    themeColor?: string;
    name: string;
};

export type InputField = {
    value: string;
    error: string;
};

export type FieldProps = {
    name: string;
    leftIcon: IconProp;
    rightIcon: IconProp;
    field: InputField;
    children: ReactNode;
};

export type LinkProps = {
    name: string;
    to: string;
    classes: string;
}

export type CardProps = {
    image?: string;
    alt?: string;
    children: ReactNode;
};

export type NotificationProps = {
    name: string;
    message: string;
    persist: boolean;
    color?: string;
};

export type NavbarProps = {
    authed?: boolean;
};

export type UseAuthResult = {
    result: {
        me: Partial<User>;
    };
    error: string;
};

export type UseRequestProps = {
    query: DocumentNode;
}

export type NotificationState = NotificationProps[];

export interface INotificationContext {
	notifications: NotificationState;
	/* eslint-disable no-unused-vars */
	createNotification: (props: NotificationProps) => void;
	deleteNotification: (name: string) => void;
}

export type AuthProps = {
    redirectTo?: string;
    redirectIfFound?: boolean;
}

export type WithNotificationProps = {
    Content: FunctionComponent;
    notification: NotificationProps;
}

export type CookieProps = {
    maxAge?: number;
    path?: string;
    key: string;
    value: string;
};

export type Cookie = CookieProps | null;
