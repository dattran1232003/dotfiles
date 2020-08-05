call plug#begin('~/.vim/plugged')

" tern for vim
Plug 'ternjs/tern_for_vim', { 'do': 'yarn add' }

" vim polyglot
Plug 'sheerun/vim-polyglot'

" commenter 
Plug 'preservim/nerdcommenter'

" Theme
Plug 'dracula/dracula-theme'
Plug 'kristijanhusak/vim-hybrid-material'

" Syntax
Plug 'pangloss/vim-javascript'
Plug 'w0rp/ale'

" Use release branch (recommend)
Plug 'neoclide/coc.nvim', {'branch': 'release'}

" switch tab vim and tmux
Plug 'christoomey/vim-tmux-navigator'

" close
Plug 'rstacruz/vim-closer'
call plug#end()

nnoremap <Left>  :echoe "Use h"<CR>
nnoremap <Right> :echoe "Use l"<CR>
nnoremap <Up>    :echoe "Use k"<CR>
nnoremap <Down>  :echoe "Use j"<CR>

" Change Leader Key
let mapleader = "-"

" Toggle relative Number
nnoremap <silent> <leader>tb :set relativenumber!<CR>

nnoremap B ^
nnoremap E $

" select all text  
nnoremap vA ggVG

" Quick save 
nnoremap <S-s> :w<CR>

" Enable Highlight Search
set hlsearch" Highlight while search
set incsearch" Case Insensitivity Pattern Matching
set ignorecase" Overrides ignorecase if pattern contains upcase
set smartcase" Keep search results at the center of screen
nnoremap n nzz
nnoremap N Nzz
nnoremap * *zz
nnoremap # #zz
nnoremap g* g*zz
nnoremap g# g#zz

" Press <leader> Enter to remove search highlights
noremap <silent> <leader><cr> :noh<cr>

" Map js to ESC in insert mode
inoremap jk <ESC>

" Disable Esp key in insert mode
inoremap <ESC> <nop>

" Switch between tabs
nnoremap <Leader>1 1gt
nnoremap <Leader>2 2gt
nnoremap <Leader>3 3gt
nnoremap <Leader>4 4gt
nnoremap <Leader>5 5gt
nnoremap <Leader>6 6gt
nnoremap <Leader>7 7gt
nnoremap <Leader>8 8gt
nnoremap <Leader>9 9gt

" Easily create a new tab.
noremap <Leader>tN :tabnew<CR>" Easily close a tab.
noremap <Leader>tc :tabclose<CR>" Easily move a tab.
noremap <Leader>tm :tabmove<CR>" Easily go to next tab.
noremap <Leader>tn :tabnext<CR>" Easily go to previous tab.
noremap <Leader>tp :tabprevious<CR>


filetype plugin indent on
set omnifunc=syntaxcomplete#Complete
" iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
"" COMMENTER CONFIG
" Add spaces after comment delimiters by default
" let g:NERDSpaceDelims = 1
"
" " Use compact syntax for prettified multi-line comments
" let g:NERDCompactSexyComs = 1
"
" " Align line-wise comment delimiters flush left instead of following code
" indentation
" let g:NERDDefaultAlign = 'left'
"
" " Set a language to use its alternate delimiters by default
" let g:NERDAltDelims_java = 1
"
" " Add your own custom formats or override the defaults
" let g:NERDCustomDelimiters = { 'c': { 'left': '/**','right': '*/' } }
"
" " Allow commenting and inverting empty lines (useful when commenting a
" region)
" let g:NERDCommentEmptyLines = 1
"
" " Enable trimming of trailing whitespace when uncommenting
let g:NERDTrimTrailingWhitespace = 1
"
" " Enable NERDCommenterToggle to check all selected lines is commented or not 
" let g:NERDToggleCheckAllLines = 1

" "Setting up for theme
filetype plugin on
packadd! dracula
syntax enable
let g:dracula_colorterm = 0
colorscheme dracula

"" Setting up for javascript syntax
let g:javascript_plugin_jsdoc = 1
let g:javascript_plugin_ngdoc = 1
let g:javascript_plugin_flow = 1
let g:ale_sign_error = '✘'
let g:ale_sign_warning = '⚠'
highlight ALEErrorSign ctermbg=NONE ctermfg=red
highlight ALEWarningSign ctermbg=NONE ctermfg=yellow
let g:ale_fixers = {
  \ 'javascript' : ['prettier', 'eslint']
  \ }

set conceallevel=1

set number

"" Set tab and indent
set tabstop=4
set shiftwidth=4
set expandtab
set autoindent

"" Show available match command
:cnoremap <Tab> <C-L><C-D>

"" Popup menu color change
hi Pmenu ctermfg=NONE ctermbg=236  cterm=NONE guifg=NONE guibg=#64666d gui=NONE
hi PmenuSel ctermfg=NONE ctermbg=24 cterm=NONE guifg=NONE guibg=#204a87 gui=NONE

" Share clipboard between Vim and OS, across platform
set clipboard=unnamedplus
