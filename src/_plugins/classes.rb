
module Jekyll

    class AllClassesIndex < Page

        def initialize(site, base, dir)
            @site = site
            @base = base
            @dir  = dir
            @name = "index.html"

            self.read_yaml(File.join(base, '_layouts'), 'classes.html')
            self.data['classes'] = self.get_all_classes(site)
            self.process(@name)
        end

        def get_all_classes(site)
            # puts "1 - AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
            {}.tap do |classes|
                # puts "2 - " + Dir.pwd
                Dir['_classes/*.yml'].each do |path|
                    # puts "3 - AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
                    name   = File.basename(path, '.yml')
                    config = YAML.load(File.read(File.join(@base, path)))
                    type   = config['type']
                    category = config['category']

                    # puts "type " + type
                    # puts "name " + name
                    # puts "category " + category

                    if config['active']
                        classes[category] = {} if classes[category].nil?
                        classes[category][type] = config
                    end
                end
            end # tap
        end #get_all_classes

    end # AllClassesIndex




    # GENERATORS
    module Generators
        class GenerateClasses < Generator
            safe true
            priority :normal

            def generate(site)
                # puts "11111111111111111111111111111111111111111111111111111111111111111111111111111111"
                generate_all_classes(site)
            end

            # Loops through the list of classes and processes each one of them.
            def generate_all_classes(site)
                # puts "222222222222222222222222222222222222222222222222222222222222"
                if Dir.exists?('src/_classes')
                    # puts "3333333333"
                    Dir.chdir('src/_classes')

                    Dir["*.yml"].each do |path|
                        # puts "444444444 " + path
                        name = File.basename(path, '.yml')
                        # self.generate_class_index(site, "_team/#{path}", name)
                    end

                    Dir.chdir(site.source)
                    self.generate_all_classes_index(site)
                end
            end

            # Generates the index page for all of the classes
            def generate_all_classes_index(site)
                # puts "55555555555555555555555555555555555555555555555555555555"
                allClasses = AllClassesIndex.new(site, site.source, "/pages/classes")
                allClasses.render(site.layouts, site.site_payload)
                allClasses.write(site.dest)

                site.pages << allClasses
                site.static_files << allClasses
            end

            # Generates the page for a specific class
            def generate_class_index(site)
                # puts "666666666666666666666666666666666666666666666666"

            end

        end # class GenerateClasses < Generator
    end # module Generators

end










