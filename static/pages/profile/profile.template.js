export const template = `
<div id="root" class="container-fluid d-flex flex-col">
{{{backButton}}}
<div class="flex-fill p-1">
    <div class="profile-form">
        {{{avatar}}}
        <form id="profileForm" class="w-100">
            {{{email}}}
            {{{login}}}
            {{{first_name}}}
            {{{second_name}}}
            {{{display_name}}}
            {{{phone}}}
        </form>
        {{{saveProfile}}}
        <div id="Buttons" class="mt-3 w-100">
            {{{editProfile}}}
            {{{editPassword}}}
            {{{ExitButton}}}
        </div>
    </div>
</div>
</div>
`;
//# sourceMappingURL=profile.template.js.map