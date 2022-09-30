module.exports = {
    menu: [
        {
            label: "Home",
            items: [
                {
                    label: "Dashboard",
                    icon: "pi pi-fw pi-home",
                    to: "/",
                },
            ],
        },
        {
            label: "UI Components",
            icon: "pi pi-fw pi-sitemap",
            items: [
                {
                    label: "Form Layout",
                    icon: "pi pi-fw pi-id-card",
                    to: "/formlayout",
                },
                { label: "Input", icon: "pi pi-fw pi-check-square", to: "/input" },
                {
                    label: "Float Label",
                    icon: "pi pi-fw pi-bookmark",
                    to: "/floatlabel",
                },
                {
                    label: "Invalid State",
                    icon: "pi pi-fw pi-exclamation-circle",
                    to: "/invalidstate",
                },
                { label: "Button", icon: "pi pi-fw pi-mobile", to: "/button" },
                { label: "Table", icon: "pi pi-fw pi-table", to: "/table" },
                { label: "List", icon: "pi pi-fw pi-list", to: "/list" },
                { label: "Tree", icon: "pi pi-fw pi-share-alt", to: "/tree" },
                { label: "Panel", icon: "pi pi-fw pi-tablet", to: "/panel" },
                { label: "Overlay", icon: "pi pi-fw pi-clone", to: "/overlay" },
                { label: "Media", icon: "pi pi-fw pi-image", to: "/media" },
                { label: "Menu", icon: "pi pi-fw pi-bars", to: "/menu" },
                { label: "Message", icon: "pi pi-fw pi-comment", to: "/messages" },
                { label: "File", icon: "pi pi-fw pi-file", to: "/file" },
                { label: "Chart", icon: "pi pi-fw pi-chart-bar", to: "/chart" },
                { label: "Misc", icon: "pi pi-fw pi-circle-off", to: "/misc" },
            ],
        },
        {
            label: "UI Blocks",
            items: [
                {
                    label: "Free Blocks",
                    icon: "pi pi-fw pi-eye",
                    to: "/blocks",
                    badge: "NEW",
                },
                {
                    label: "All Blocks",
                    icon: "pi pi-fw pi-globe",
                    url: "https://www.primefaces.org/primeblocks-react",
                },
            ],
        },
        {
            label: "Icons",
            items: [{ label: "PrimeIcons", icon: "pi pi-fw pi-prime", to: "/icons", badge: "NEW" }],
        },
        {
            label: "Pages",
            icon: "pi pi-fw pi-clone",
            items: [
                { label: "Crud", icon: "pi pi-fw pi-user-edit", to: "/crud" },
                { label: "Timeline", icon: "pi pi-fw pi-calendar", to: "/timeline" },
                { label: "Empty", icon: "pi pi-fw pi-circle-off", to: "/empty" },
            ],
        },
        {
            label: "Menu Hierarchy",
            icon: "pi pi-fw pi-search",
            items: [
                {
                    label: "Submenu 1",
                    icon: "pi pi-fw pi-bookmark",
                    items: [
                        {
                            label: "Submenu 1.1",
                            icon: "pi pi-fw pi-bookmark",
                            items: [
                                { label: "Submenu 1.1.1", icon: "pi pi-fw pi-bookmark" },
                                { label: "Submenu 1.1.2", icon: "pi pi-fw pi-bookmark" },
                                { label: "Submenu 1.1.3", icon: "pi pi-fw pi-bookmark" },
                            ],
                        },
                        {
                            label: "Submenu 1.2",
                            icon: "pi pi-fw pi-bookmark",
                            items: [
                                { label: "Submenu 1.2.1", icon: "pi pi-fw pi-bookmark" },
                                { label: "Submenu 1.2.2", icon: "pi pi-fw pi-bookmark" },
                            ],
                        },
                    ],
                },
                {
                    label: "Submenu 2",
                    icon: "pi pi-fw pi-bookmark",
                    items: [
                        {
                            label: "Submenu 2.1",
                            icon: "pi pi-fw pi-bookmark",
                            items: [
                                { label: "Submenu 2.1.1", icon: "pi pi-fw pi-bookmark" },
                                { label: "Submenu 2.1.2", icon: "pi pi-fw pi-bookmark" },
                                { label: "Submenu 2.1.3", icon: "pi pi-fw pi-bookmark" },
                            ],
                        },
                        {
                            label: "Submenu 2.2",
                            icon: "pi pi-fw pi-bookmark",
                            items: [
                                { label: "Submenu 2.2.1", icon: "pi pi-fw pi-bookmark" },
                                { label: "Submenu 2.2.2", icon: "pi pi-fw pi-bookmark" },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            label: "Get Started",
            items: [
                {
                    label: "Documentation",
                    icon: "pi pi-fw pi-question",
                    to: "/documentation",
                },
                {
                    label: "View Source",
                    icon: "pi pi-fw pi-search",
                    url: "https://github.com/primefaces/sakai-react",
                },
            ],
        },
    ],
};
