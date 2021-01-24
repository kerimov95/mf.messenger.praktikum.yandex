export const template = `
<div class="container-fluid d-flex flex-col">
            <div class="p-3">
                {{{backButton}}}
            </div>
            <div class="flex-fill p-1">
                <div class="profile-form">

                    {{{avatar}}}
                    
                    <form id="profileForm" class="w-100">
                        {{{oldPassword}}}
                        {{{newPassword}}}
                        {{{confirmNewPassword}}}
                    </form>

                    {{{saveButton}}}

                </div>
            </div>
        </div>
`;
//# sourceMappingURL=editPassword.template.js.map