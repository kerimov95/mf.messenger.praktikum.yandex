export interface Event {
    INIT: string;
    FLOW_CDM: string;
    FLOW_CDU: string;
    FLOW_RENDER: string;
}

export interface Meta {
    tagName: string;
    props: unknown;
}