export const template = `
<div class="container-fluid d-flex flex-col profile-page">
            <div class="p-3">
                {{{backButton}}}
            </div>
            <div class="flex-fill p-1">
                <div class="profile-form">

                    {{{avatar}}}
                    
                    <form id="passwordForm" class="w-100">
                        {{{oldPassword}}}
                        {{{newPassword}}}
                        {{{confirmNewPassword}}}
                    </form>

                    {{{saveButton}}}

                </div>
            </div>
        </div>
`