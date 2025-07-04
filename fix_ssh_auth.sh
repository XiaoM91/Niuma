#!/bin/bash

echo "🔧 Niuma SSH Authentication Fix Script"
echo "======================================"

# Check if SSH key exists
if [ ! -f ~/.ssh/id_ed25519 ]; then
    echo "❌ SSH key not found. Please run the GitHub setup instructions first."
    exit 1
fi

echo "✅ SSH key found"

# Add SSH key to agent
echo "🔑 Adding SSH key to ssh-agent..."
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

echo ""
echo "📋 Your SSH public key (copy this to GitHub):"
echo "=============================================="
cat ~/.ssh/id_ed25519.pub
echo ""
echo "=============================================="

echo ""
echo "📝 Next Steps:"
echo "1. Copy the SSH key above"
echo "2. Go to GitHub.com → Settings → SSH and GPG keys"
echo "3. Click 'New SSH key' and paste the key"
echo "4. Run: ssh -T git@github.com (to test)"
echo "5. Run: git push -u origin main (to push code)"

echo ""
echo "🔗 Or use HTTPS instead:"
echo "git remote remove origin"
echo "git remote add origin https://github.com/XiaoM91/Niuma.git"
echo "git push -u origin main"

echo ""
echo "📖 For detailed instructions, see: SSH_FIX_INSTRUCTIONS.md"