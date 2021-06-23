import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FunctionComponent, ReactNode } from 'react';

export type LoginResult = {
	login: User;
};

export type User = {
    _id: string;
    username: string;
    password: string;
    bio: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
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
};

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
