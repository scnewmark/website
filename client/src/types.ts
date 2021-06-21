import { FunctionComponent, ReactNode } from 'react';

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
